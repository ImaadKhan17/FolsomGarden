from django.shortcuts import render
from item.models import Category, Item
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import DataSerializer, SignupSerializer
from core.forms import SignupForm
import logging

# Create your views here.
logger = logging.getLogger(__name__)

@api_view(['GET'])
def getData(request):
    data = Category.objects.all()
    serializer = DataSerializer(data, many=True)
    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data_view(request):
    user = request.user
    user_data = {
        "username": user.username,
        "email": user.email,
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

