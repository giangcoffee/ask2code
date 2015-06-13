from django.db import models
from authentication.models import Account

class Post(models.Model):
    author = models.ForeignKey(Account)
    content = models.TextField(default='not updated')
    title = models.TextField(default='not updated')
    tags = models.TextField(default='not updated')
    comments = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.title[:20]

