# accounts.urls
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView

urlpatterns = [
    path('login', obtain_auth_token),
    path('signup', SignupView.as_view())
]