from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.getUser.as_view(), name="get_user"),

    path('posts/', views.postList.as_view(), name='posts'),

    path('comments/<int:pk>', views.commentList.as_view(), name='comments'),
]