from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
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



class RecapSummaryView(RetrieveAPIView, UpdateAPIView):
    queryset = RecapSummary.objects.all()
    serializer_class = RecapSummarySerializer 
    permission_classes = [AllowAny]
    

    def retrieve(self, request, recap_id=None):
        summary = RecapSummary.objects.get(recap=recap_id)
        serializer = RecapSummarySerializer(summary, many=False)
        if summary:
            return Response(serializer.data)
        

    # def create(self, request, recap_id=None):
    #     exisiting_transcript = self.get_queryset().filter(recap=recap_id).first()
    #     if exisiting_transcript:
    #         return Response({'error': 'A Summary already exists for this recap.'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     serializer = RecapSummarySerializer(data=request.data)
        
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else: 
    #         return Response(serializer.errors)
        
    def update(self, request, recap_id=None):
        summary = RecapSummary.objects.filter(recap=recap_id).first()
        if summary:
            serializer = RecapSummarySerializer(summary, data=request.data, partial=True)
        else:
            data = request.data
            data['recap'] = recap_id
            serializer = RecapSummarySerializer(data=data)
            
            
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class RecapTranscriptView(RetrieveAPIView, UpdateAPIView):
    queryset = RecapTranscript.objects.all()
    serializer_class = RecapTranscriptSerializer
    permission_classes = [AllowAny]

    def retrieve(self, request, recap_id=None):
        transcript = RecapTranscript.objects.get(recap=recap_id)
        serializer = RecapTranscriptSerializer(transcript, many=False)
        if transcript:
            return Response(serializer.data)
        else: 
            return Response({'error': 'No transcript found for this recap.'}, status=status.HTTP_404_NOT_FOUND)
    
    # def create(self, request, recap_id=None):
        
    #     exisiting_transcript = self.get_queryset().filter(recap=recap_id).first()
    #     if exisiting_transcript:
    #         return Response({'error': 'A transcript already exists for this recap.'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     serializer = RecapTranscriptSerializer(data=request.data)
        
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else: 
    #         return Response(serializer.errors)
        
    def update(self, request, recap_id=None):
        transcript = RecapTranscript.objects.filter(recap=recap_id).first()
        print(transcript)
        if transcript:
            serializer = RecapTranscriptSerializer(transcript, data=request.data, partial=True)
        else:
            data = request.data
            data['recap'] = recap_id
            serializer = RecapTranscriptSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
    # def delete(self, request, recap_id=None):
    #     transcripts = RecapTranscript.objects.filter(recap=recap_id)
    #     transcripts.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    
    

    
# class RecapSummaryDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = RecapSummary.objects.all()
#     serializer_class = RecapSummarySerializer
#     permission_classes = [AllowAny]
    

#     def retrieve(self, request, recap_id=None, summary_id=None):
#         summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
#         serializer = RecapSummarySerializer(summary)
#         return Response(serializer.data)


    # def update(self, request, recap_id=None, summary_id=None):
    #     summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
    #     serializer = RecapSummarySerializer(summary, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)


#     def delete(self, request, recap_id=None, summary_id=None):
#         summary = RecapSummary.objects.get(recap=recap_id, id=summary_id)
#         summary.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)



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
        
        