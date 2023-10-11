from django.urls import path
from .views import RecapView, RecapDetailView, RecapSummaryView, RecapTranscriptView

urlpatterns = [
    path('', RecapView.as_view(), name='recap-list'),
    
    path('<int:recap_id>/', RecapDetailView.as_view(), name='recap-detail'),
    
    path('<int:recap_id>/summary/', RecapSummaryView.as_view(), name='recap-summary-list'),
    
    # path('<int:recap_id>/summaries/<int:summary_id>/', RecapSummaryDetailView.as_view(), name='recap-summary-detail'),
    
    path('<int:recap_id>/transcript/', RecapTranscriptView.as_view(), name='recap-transcript'),
    
    # path('<int:meeting_id>/transcript/<int:transcript_id>/', MeetingTranscriptDetailView.as_view(), name='meeting-transcript-detail'),
]
