from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register(r'post', views.PostItemViewSet, basename="post")

urlpatterns = [
    path('user/', views.GetCurrentUser.as_view(), name="get_user"),

    #path('posts/', views.PostList.as_view(), name='posts'),
    #path('post/', views.PostItemViewSet.as_view(), name='post'),
    path('upload_images/', views.UploadImagesViewSet.as_view(), name='upload_images'),

    path('comments/<int:pk>', views.CommentList.as_view(), name='comments'),
    path('comment/', views.CommentItemViewSet.as_view(), name='comment'),
]

urlpatterns += router.urls