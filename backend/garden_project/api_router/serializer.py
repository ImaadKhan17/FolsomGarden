from rest_framework import serializers
from item.models import Category
from django.contrib.auth.models import User

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields = '__all__'

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


