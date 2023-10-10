from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Recap, RecapSummary, RecapTranscript
from .serializers import RecapSerializer, RecapSummarySerializer, RecapTranscriptSerializer



class RecapView(ListCreateAPIView):
    queryset = Recap.objects.all()
    serializer_class = RecapSerializer
    permission_classes = [AllowAny]
    

    def list(self, request):
        queryset = self.get_queryset()
        serializer = RecapSerializer(queryset, many=True)
        return Response(serializer.data)
    

    def create(self, request):
        serializer = RecapSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    

class RecapDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = RecapSerializer
    permission_classes = [AllowAny]
    
    

    def retrieve(self, request, recap_id=None):
        recap = Recap.objects.get(id=recap_id)
        serializer = RecapSerializer(recap)
        return Response(serializer.data)
    

    def update(self, request, recap_id=None):
        recap = Recap.objects.get(id=recap_id)
        serializer = RecapSerializer(recap, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        

    def destroy(self, request, recap_id=None):
        recap = Recap.objects.get(id=recap_id)
        recap.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class RecapSummaryView(ListCreateAPIView):
    queryset = RecapSummary.objects.all()
    serializer_class = RecapSummarySerializer 
    permission_classes = [AllowAny]
    

    def list(self, request, recap_id=None, summary_id=None):
        queryset = self.get_queryset().filter(recap=recap_id)
        serializer = RecapSummarySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, recap_id=None, summary_id=None):
        serializer = RecapSummarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    
class RecapSummaryDetailView(RetrieveUpdateDestroyAPIView):
    queryset = RecapSummary.objects.all()
    serializer_class = RecapSummarySerializer
    permission_classes = [AllowAny]
    

    def retrieve(self, request, recap_id=None, summary_id=None):
        summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
        serializer = RecapSummarySerializer(summary)
        return Response(serializer.data)


    def update(self, request, recap_id=None, summary_id=None):
        summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
        serializer = RecapSummarySerializer(summary, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


    def delete(self, request, recap_id=None, summary_id=None):
        summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
        summary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class RecapTranscriptView(ListCreateAPIView, DestroyAPIView):
    queryset = RecapTranscript.objects.all()
    serializer_class = RecapTranscriptSerializer
    permission_classes = [AllowAny]

    def delete(self, request, recap_id=None):
        transcripts = RecapTranscript.objects.filter(recap=recap_id)
        transcripts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def list(self, request, recap_id=None):
        transcript = RecapTranscript.objects.get(recap=recap_id)
        serializer = RecapTranscriptSerializer(transcript)
        return Response(serializer.data)
    
    def create(self, request, recap_id=None):
        
        exisiting_transcript = self.get_queryset().filter(recap=recap_id).first()
        if exisiting_transcript:
            return Response({'error': 'A transcript already exists for this recap.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecapTranscriptSerializer(data=request.data)
        
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
        
        