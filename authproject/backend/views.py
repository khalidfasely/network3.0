from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserProfileSerializer, PostSerializer, CommentSerializer

from .models import Post, PostComment

from rest_framework import status

from rest_framework.views import APIView

from rest_framework.generics import RetrieveAPIView, ListAPIView, GenericAPIView
from rest_framework.mixins import CreateModelMixin

from rest_framework.pagination import PageNumberPagination

class GetCurrentUser(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_user(self):
        return self.request.user

    def retrieve(self, request):
        user = self.get_user()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class PostList(ListAPIView):
    queryset = Post.objects.all().order_by('-date')
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination

class CommentList(ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        post = Post.objects.get(pk=self.kwargs.get('pk'))
        comments = PostComment.objects.filter(post=post).order_by('-date')
        return comments

class PostItemViewSet(GenericAPIView, CreateModelMixin):
    serializer_class = PostSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        images = self.request.FILES.getlist('images')
        serializer.save(user=self.request.user)

class CommentItemViewSet(GenericAPIView, CreateModelMixin):#ViewSet
    serializer_class = CommentSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, post=Post.objects.get(pk=self.request.data['postId']))

#https://ilovedjango.com/django/rest-api-framework/tips/save-foreign-key-using-django-rest-framework-create-method/

#upload images to db first, then get their ids, then when we add post we send the images ids with it and we then when we create the post we loop for the images and add the post id to each image which their id was returned at first in create_perform