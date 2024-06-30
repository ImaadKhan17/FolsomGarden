from django.shortcuts import render
from item.models import Category, Item
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import DataSerializer

# Create your views here.


@api_view(['GET'])
def getData(request):
    data = Category.objects.all()
    serializer = DataSerializer(data, many=True)
    return Response(serializer.data) 