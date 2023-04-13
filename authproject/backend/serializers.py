from rest_framework import serializers
from .models import CustomUser

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'email', 'username', 'email_verified')

#https://dev.to/willp11/django-part-3-user-authentication-with-dj-rest-auth-and-allauth-4dih ## Next, we will create a serializer