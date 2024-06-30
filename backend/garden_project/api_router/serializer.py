from rest_framework import serializers
from item.models import Category

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields = '__all__'