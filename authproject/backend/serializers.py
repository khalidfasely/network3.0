from rest_framework import serializers
from .models import CustomUser, PostImage, Post, PostComment

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'email', 'username', 'email_verified')

#https://dev.to/willp11/django-part-3-user-authentication-with-dj-rest-auth-and-allauth-4dih ## Next, we will create a serializer

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PostComment
        fields = '__all__'

    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'

"""class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self, obj):
        comments = obj.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def get_images(self, obj):
        images = obj.images.all()
        serializer = ImageSerializer(images, many=True)
        return serializer.data
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data"""

class PostSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)

    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(required=True, max_length=5000)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def get_user(self, obj):
        user = obj.user
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data

    def get_comments(self, obj):
        comments = obj.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def get_images(self, obj):
        images = obj.images.all()
        serializer = ImageSerializer(images, many=True)
        return serializer.data