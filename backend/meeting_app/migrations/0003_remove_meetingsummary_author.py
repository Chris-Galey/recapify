# Generated by Django 4.2.5 on 2023-10-05 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting_app', '0002_alter_meeting_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meetingsummary',
            name='author',
        ),
    ]
