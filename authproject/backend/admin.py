from django.contrib import admin
from .models import CustomUser, Post, PostComment, PostImage

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Post)
admin.site.register(PostComment)
admin.site.register(PostImage)