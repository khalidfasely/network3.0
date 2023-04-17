from rest_framework import serializers
from .models import CustomUser, PostImage, Post, PostComment

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'email', 'username', 'email_verified',)

#https://dev.to/willp11/django-part-3-user-authentication-with-dj-rest-auth-and-allauth-4dih ## Next, we will create a serializer

class CommentSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField(read_only=True)
    date = serializers.DateTimeField(required=False)

    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(required=True, max_length=5000)

    class Meta:
        model = PostComment
        fields = ('id', 'post', 'user', 'content', 'date',)

    def create(self, validated_data):
        return PostComment.objects.create(**validated_data)

    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ('id', 'post', 'image',)

class ImageSerializerIDs(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ('id',)

class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)

    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(required=True, max_length=5000)
    date = serializers.DateTimeField(required=False)

    class Meta:
        model = Post
        fields = ('id', 'user', 'content', 'date', 'images', 'comments', 'likes',)

    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data

    def get_comments(self, obj):
        comments = obj.comments.all()
        #serializer = CommentSerializer(comments, many=True)
        return comments.count()

    def get_images(self, obj):
        images = obj.images.all()
        serializer = ImageSerializer(images, many=True)
        return serializer.data