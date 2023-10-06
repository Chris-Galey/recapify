from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Meeting, MeetingSummary, MeetingTranscript
from .serializers import MeetingSerializer, MeetingSummarySerializer, MeetingTranscriptSerializer



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
    

class MeetingDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = MeetingSerializer
    permission_classes = [AllowAny]
    
    
# GET /api/meetings/{meeting_id}/ -- Fetches details for a specific meeting by its ID.
    def retrieve(self, request, meeting_id=None):
        meeting = Meeting.objects.get(id=meeting_id)
        serializer = MeetingSerializer(meeting)
        return Response(serializer.data)
    
# PUT /api/meetings/{meeting_id}/ -- Allows users to update an existing meeting's details.
    def update(self, request, meeting_id=None):
        meeting = Meeting.objects.get(id=meeting_id)
        serializer = MeetingSerializer(meeting, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        
# DELETE /api/meetings/{meeting_id}/ -- Permits users to delete a meeting and its associated data.
    def destroy(self, request, meeting_id=None):
        meeting = Meeting.objects.get(id=meeting_id)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


''' Below are meeting summary endpoints'''

class MeetingSummaryView(ListCreateAPIView):
    queryset = MeetingSummary.objects.all()
    serializer_class = MeetingSummarySerializer 
    permission_classes = [AllowAny]
    
# GET /api/meetings/{meeting_id}/summaries/ -- Retrieves a list of all summaries associated with a particular meeting.
    def list(self, request, meeting_id=None, summary_id=None):
        queryset = self.get_queryset().filter(meeting=meeting_id)
        serializer = MeetingSummarySerializer(queryset, many=True)
        return Response(serializer.data)
# POST /api/meetings/{meeting_id}/summaries/ -- Enables users to create a summary for a specific meeting.
    def create(self, request, meeting_id=None, summary_id=None):
        serializer = MeetingSummarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    
class MeetingSummaryDetailView(RetrieveUpdateDestroyAPIView):
    queryset = MeetingSummary.objects.all()
    serializer_class = MeetingSummarySerializer
    permission_classes = [AllowAny]
    
# GET /api/summaries/{summary_id}/ -- fetches details for a specific meeting summary by its ID.
    def retrieve(self, request, meeting_id=None, summary_id=None):
        summary = MeetingSummary.objects.get(meeting=meeting_id, id=summary_id)
        serializer = MeetingSummarySerializer(summary)
        return Response(serializer.data)

# PUT /api/summaries/{summary_id}/ -- Allows users to update an existing summary's content.
    def update(self, request, meeting_id=None, summary_id=None):
        summary = MeetingSummary.objects.get(meeting=meeting_id, id=summary_id)
        serializer = MeetingSummarySerializer(summary, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

# DELETE /api/summaries/{summary_id}/
    def delete(self, request, meeting_id=None, summary_id=None):
        summary = MeetingSummary.objects.get(meeting=meeting_id, id=summary_id)
        summary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class MeetingTranscriptView(ListCreateAPIView, DestroyAPIView):
    queryset = MeetingTranscript.objects.all()
    serializer_class = MeetingTranscriptSerializer
    permission_classes = [AllowAny]

    def delete(self, request, meeting_id=None):
        transcripts = MeetingTranscript.objects.filter(meeting=meeting_id)
        transcripts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def list(self, request, meeting_id=None):
        transcript = MeetingTranscript.objects.get(meeting=meeting_id)
        serializer = MeetingTranscriptSerializer(transcript)
        return Response(serializer.data)
    
    def create(self, request, meeting_id=None):
        
        exisiting_transcript = self.get_queryset().filter(meeting=meeting_id).first()
        if exisiting_transcript:
            return Response({'error': 'A transcript already exists for this meeting.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = MeetingTranscriptSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors)

    
# class MeetingTranscriptDetailView(RetrieveDestroyAPIView):
#     queryset = MeetingTranscript.objects.all()
#     serializer_class = MeetingTranscriptSerializer
#     permission_classes = [AllowAny]
    
#     def retrieve(self, request, meeting_id=None, transcript_id=None):
#         transcript = MeetingTranscript.objects.get(meeting=meeting_id, id=transcript_id)
#         serializer = MeetingTranscriptSerializer(transcript)
#         return Response(serializer.data)
       
        
#     def destroy(self, request, meeting_id=None, transcript_id=None):
#         transcript = MeetingTranscript.objects.get(meeting=meeting_id, id=transcript_id)
#         transcript.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
        
        