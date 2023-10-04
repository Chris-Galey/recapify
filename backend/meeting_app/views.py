from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Meeting, MeetingSummary
from .serializers import MeetingSerializer, MeetingSummarySerializer



class MeetingView(ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [AllowAny]
    
# GET /api/meetings/ -- Retrieves a list of all meetings.
    def list(self, request):
        queryset = self.get_queryset()
        serializer = MeetingSerializer(queryset, many=True)
        return Response(serializer.data)
    
#  POST /api/meetings/ -- Allows users to create a new meeting.
    def create(self, request):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    

class MeetingDetailView(RetrieveUpdateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [AllowAny]
    lookup_field = 'meeting_id'
    
# GET /api/meetings/{meeting_id}/ -- Fetches details for a specific meeting by its ID.
    def retrieve(self, request, meeting_id=None):
        meeting = self.get_object()
        serializer = MeetingSerializer(meeting)
        return Response(serializer.data)
    
# PUT /api/meetings/{meeting_id}/ -- Allows users to update an existing meeting's details.
    def update(self, request, meeting_id=None):
        meeting = self.get_object()
        serializer = MeetingSerializer(meeting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        
# DELETE /api/meetings/{meeting_id}/ -- Permits users to delete a meeting and its associated data.
    def destroy(self, request, meeting_id=None):
        meeting = self.get_object()
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


''' Below are meeting summary endpoints'''

class MeetingSummaryView(ListCreateAPIView):
    queryset = MeetingSummary.objects.all()
    serializer_class = MeetingSummarySerializer 
    permission_classes = [AllowAny]
    
# GET /api/meetings/{meeting_id}/summaries/ -- Retrieves a list of all summaries associated with a particular meeting.
    def list(self, request):
        queryset = self.get_queryset()
        serializer = MeetingSummarySerializer(queryset, many=True)
        return Response(serializer.data)
# POST /api/meetings/{meeting_id}/summaries/ -- Enables users to create a summary for a specific meeting.
    def create(self, request):
        serializer = MeetingSummarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    
class MeetingSummaryDetailView(RetrieveUpdateAPIView):
    queryset = MeetingSummary.objects.all()
    serializer_class = MeetingSummarySerializer
    permission_classes = [AllowAny]
    lookup_field = 'summary_id'
    
# GET /api/summaries/{summary_id}/ -- fetches details for a specific meeting summary by its ID.
    def retrieve(self, request, summary_id=None):
        summary = self.get_object()
        serializer = MeetingSummarySerializer(summary)
        return Response(serializer.data)

# PUT /api/summaries/{summary_id}/ -- Allows users to update an existing summary's content.
    def update(self, request, summary_id=None):
        summary = self.get_object()
        serializer = MeetingSummarySerializer(summary, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

# DELETE /api/summaries/{summary_id}/
    def delete(self, request, summary_id=None):
        summary = self.get_object()
        summary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)