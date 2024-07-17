from django.urls import path
from . import views
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

app_name = 'api'

urlpatterns = [
    path('', views.getData),
    path('user/data/', views.user_data_view, name="user_data"),
    path('signup/', views.signup_view, name="signup"),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh')
]