# Generated by Django 4.2.5 on 2023-10-17 17:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recap_app', '0003_recap_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recap',
            name='author',
        ),
    ]
