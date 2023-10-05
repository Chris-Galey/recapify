# Generated by Django 4.2.5 on 2023-10-05 12:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='meetings', to=settings.AUTH_USER_MODEL),
        ),
    ]