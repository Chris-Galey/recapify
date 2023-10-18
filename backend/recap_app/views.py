from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import Recap, RecapSummary, RecapTranscript
from .serializers import RecapSerializer, RecapSummarySerializer, RecapTranscriptSerializer
from django.contrib.auth.models import User
import requests
import json
import time
# import assemblyai as aai

# aai.settings.api_key = f"72a3bd6a64304298b16f08870cf96698"




class RecapView(ListCreateAPIView):
    queryset = Recap.objects.all()
    serializer_class = RecapSerializer
    permission_classes = [AllowAny]
    

    def list(self, request):
        recaps = Recap.objects.filter(user=self.request.user)
        serializer = RecapSerializer(recaps, many=True)
        return Response(serializer.data)

    def create(self, request):
        print(request.user)
        serializer = RecapSerializer(data=request.data, context={'request': request})
        
        
    

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
    
    
    # ASSEMBLYAI API
base_url = "https://api.assemblyai.com/v2"

headers = {
    "authorization": "72a3bd6a64304298b16f08870cf96698" 
}   

class AssemblyGenerateUrlView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        file = request.data['audio']
        response = requests.post(base_url + "/upload",
                          headers=headers,
                          data=file)

        upload_url = response.json()["upload_url"]
        return Response(upload_url)

class AssemblyGenerateTranscriptView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        
        
        
        audio_url = request.data['url']
        custom_state = request.data['customState']
        data = {
    "audio_url": audio_url,
    "summarization": custom_state['summarization'],
    "summary_model": custom_state['summary_model'],
     "summary_type": custom_state['summary_type'],
     "entity_detection": custom_state['entity_detection'],
}
    
        url = base_url + "/transcript"
        response = requests.post(url, json=data, headers=headers)
        transcript_id = response.json()['id']
        polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
        transcription_result = requests.get(polling_endpoint, headers=headers).json()
        
        
        while True:
            transcription_result = requests.get(polling_endpoint, headers=headers).json()

            if transcription_result['status'] == 'completed':
                return Response(transcription_result)
                

            elif transcription_result['status'] == 'error':
                raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

            else:
                time.sleep(3)
    
    

        
        