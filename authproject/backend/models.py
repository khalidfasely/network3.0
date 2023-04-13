from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100, null=True, blank=True)
    email_verified = models.BooleanField(default=False)

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='poster')
    content = models.TextField(max_length=5000)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"by {self.user.username}"

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField()

    def __str__(self):
        return self.post.user.email
    
class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='commenter')
    content = models.TextField(max_length=2000)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"by {self.user.username}"