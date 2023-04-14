from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserProfileSerializer, PostSerializer, CommentSerializer

from .models import Post, PostComment

from rest_framework import status

from rest_framework.views import APIView

from rest_framework.generics import RetrieveAPIView, ListAPIView

from rest_framework.pagination import PageNumberPagination

class getUser(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_user(self):
        return self.request.user

    def retrieve(self, request):
        user = self.get_user()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class postList(ListAPIView):
    queryset = Post.objects.all().order_by('-date')
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination

class commentList(ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        post = Post.objects.get(pk=self.kwargs.get('pk'))
        comments = PostComment.objects.filter(post=post).order_by('-date')
        return comments

class postItem(APIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            #https://ilovedjango.com/django/rest-api-framework/tips/save-foreign-key-using-django-rest-framework-create-method/
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)