# Generated by Django 5.1.1 on 2024-09-20 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('uid', models.TextField(primary_key=True, serialize=False)),
                ('summary', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('due_date', models.DateField(blank=True)),
            ],
        ),
    ]