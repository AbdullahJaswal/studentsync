# Generated by Django 5.1.1 on 2024-09-20 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0004_alter_event_description_alter_event_due_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="description",
            field=models.TextField(blank=True, default=""),
            preserve_default=False,
        ),
    ]
