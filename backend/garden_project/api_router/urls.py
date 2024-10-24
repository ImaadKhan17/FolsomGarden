from django.urls import path
from . import views
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

app_name = 'api'

urlpatterns = [
    path('', views.main_api, name="main_api"),
    path('user/data/', views.user_data_view, name="user_data"),
    path('user/<int:pk>', views.user, name="user_data_from_id"),
    path('signup/', views.signup_view, name="signup"),
    path('items/', views.all_items, name="all_items"  ),
    path('items/<int:pk>/', views.item_detail, name="item_detail"),
    path('items/search/', views.search, name="search_item"),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh')
]