from django.urls import path
from .views import RecapView, RecapDetailView, RecapSummaryView, RecapTranscriptView, AssemblyGenerateUrlView, AssemblyGenerateTranscriptView

urlpatterns = [
    path('', RecapView.as_view(), name='recap-list'),
    
    path('<int:recap_id>/', RecapDetailView.as_view(), name='recap-detail'),
    
    path('<int:recap_id>/summary/', RecapSummaryView.as_view(), name='recap-summary-list'),
    
    path('<int:recap_id>/transcript/', RecapTranscriptView.as_view(), name='recap-transcript'),
    
    path('generateUrl/', AssemblyGenerateUrlView.as_view(), name='generate-url', ),
    
    path('generateTranscript/', AssemblyGenerateTranscriptView.as_view(), name='generate-transcript',)
    
]
