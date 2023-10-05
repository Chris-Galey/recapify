from rest_framework import serializers
from .models import Meeting, MeetingSummary, MeetingTranscript

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class MeetingSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingSummary
        fields = '__all__'

class MeetingTranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingTranscript
        fields = '__all__'