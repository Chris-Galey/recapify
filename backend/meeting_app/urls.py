from django.urls import path
from .views import MeetingView, MeetingDetailView, MeetingSummaryView

urlpatterns = [
    path('/', MeetingView.as_view(), name='meeting-list'),
    path('/<int:meeting_id>/', MeetingDetailView.as_view(), name='meeting-detail'),
    path('/<int:<meeting_id>/summaries/', MeetingSummaryView.as_view(), name='meeting-summary-list'),
    path('/<int:meeting_id>/summaries/<int:summary_id>/', MeetingSummaryView.as_view(), name='meeting-summary-detail'),
]
