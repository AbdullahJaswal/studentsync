# Generated by Django 5.1.1 on 2024-09-21 04:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0008_alter_usercalendar_options_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="event",
            options={"verbose_name": "Event", "verbose_name_plural": "Events"},
        ),
    ]
