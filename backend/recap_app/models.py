from django.db import models
from django.contrib.auth.models import User

class Recap(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
        
class RecapTranscript(models.Model):
    recap = models.OneToOneField(Recap, on_delete=models.CASCADE, related_name='transcript')
    raw_transcript = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Transcript for {self.recap.title}"
    
class RecapSummary(models.Model):
    recap = models.OneToOneField(Recap, on_delete=models.CASCADE, related_name='summaries')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Summary for {self.recap.title}"