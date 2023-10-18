from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recap, RecapSummary, RecapTranscript, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        
class RecapSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Recap
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['request'].user
        print(user)
        recap = Recap.objects.create(user=user, **validated_data)
        return recap

        
    
class RecapSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapSummary
        fields = '__all__'

class RecapTranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapTranscript
        fields = '__all__'