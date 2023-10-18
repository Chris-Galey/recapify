from rest_framework import serializers
from rest_framework.serializers import PrimaryKeyRelatedField
from django.contrib.auth.models import User
from .models import Recap, RecapSummary, RecapTranscript, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        
class RecapSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    
    class Meta:
        model = Recap
        fields = ('user','title', 'description', 'created_at') 
    
    
class RecapSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapSummary
        fields = '__all__'

class RecapTranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapTranscript
        fields = '__all__'