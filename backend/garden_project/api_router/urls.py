from django.urls import path
from . import views
from django.conf import settings

app_name = 'api'

urlpatterns = [
    path('', views.getData),
]