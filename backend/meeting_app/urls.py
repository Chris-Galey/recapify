from django.urls import path
from .views import MeetingView, MeetingDetailView, MeetingSummaryView, MeetingSummaryDetailView, MeetingTranscriptView

urlpatterns = [
    path('', MeetingView.as_view(), name='meeting-list'),
    
    path('<int:meeting_id>/', MeetingDetailView.as_view(), name='meeting-detail'),
    
    path('<int:meeting_id>/summaries/', MeetingSummaryView.as_view(), name='meeting-summary-list'),
    
    path('<int:meeting_id>/summaries/<int:summary_id>/', MeetingSummaryDetailView.as_view(), name='meeting-summary-detail'),
    
    path('<int:meeting_id>/transcript/', MeetingTranscriptView.as_view(), name='meeting-transcript'),
    
    # path('<int:meeting_id>/transcript/<int:transcript_id>/', MeetingTranscriptDetailView.as_view(), name='meeting-transcript-detail'),
]
