from rest_framework import serializers
from item.models import Item
from django.contrib.auth.models import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class ItemDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'image' , 'price', 'quantity', 'unit', 'category', 'created_by', 'created_at', 'is_sold']
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']