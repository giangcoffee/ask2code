# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.TextField(default='not updated'),
        ),
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.TextField(default='not updated'),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(default='not updated'),
        ),
    ]
