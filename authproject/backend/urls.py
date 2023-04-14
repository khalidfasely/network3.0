from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.GetCurrentUser.as_view(), name="get_user"),

    path('posts/', views.PostList.as_view(), name='posts'),
    path('post/', views.PostItemViewSet.as_view(), name='post'),

    path('comments/<int:pk>', views.CommentList.as_view(), name='comments'),
    path('comment/', views.CommentItemViewSet.as_view(), name='comment'),
]