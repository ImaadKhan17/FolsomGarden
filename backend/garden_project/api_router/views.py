from django.shortcuts import render, get_object_or_404
from item.models import Category, Item
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import ItemDataSerializer, SignupSerializer, UserSerializer
from core.forms import SignupForm
import logging
from django.db.models import Q
from django.contrib.auth.models import User

# Create your views here.
logger = logging.getLogger(__name__)

@api_view(['GET'])
def main_api(request):
    return Response("This is the main API endpoint") 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data_view(request):
    user = request.user
    user_data = {
        "username": user.username,
        "email": user.email,
        "id": user.id,
        # Include any other user-specific data you need
    }
    return Response(user_data)

@api_view(['POST'])
def signup_view(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            form_data = {"username": serializer.validated_data['username'], "email": serializer.validated_data['email'], "password1": serializer.validated_data['password'], "password2": serializer.validated_data['password']}
            form = SignupForm(form_data)
            if form.is_valid():
                form.save()
                return Response({
                    "message": "User created successfully",
                    "username": form_data['username'],
                }, status=201)
            else:
                logger.error(form.errors)  # Log form errors
                return Response(form.errors, status=400)
        else:
            logger.error(serializer.errors)  # Log serializer errors
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def all_items(request):
    data = Item.objects.filter(is_sold = False)
    data = data.order_by('-created_at')
    serializer = ItemDataSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def item_detail(request, pk):
    item = get_object_or_404(Item, pk=pk)
    related_items = Item.objects.filter(category=item.category, is_sold=False).exclude(pk=pk)[0:3]
    rel_serializer = ItemDataSerializer(related_items, many=True)
    serializer = ItemDataSerializer(item)
    return Response([serializer.data, rel_serializer.data])

@api_view(['GET'])
def search(request):
    query = request.GET.get('query', '')
    items = Item.objects.filter(is_sold = False)
    if query:
        items = items.filter(Q(name__icontains=query)|Q(description__icontains=query)).order_by('-created_at')
        serializer = ItemDataSerializer(items, many=True)
        return Response(serializer.data)
    return Response("No query given, please try again")   

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user(request, pk):
    if user:= User.objects.get(id = pk):
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response("No user found with the given id")
   
