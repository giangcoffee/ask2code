"""ask2code URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url, patterns
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from ask2code.views import IndexView, SignInView, SignUpView, NewBlogView
from post.views import PostViewSet, AccountPostsViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns('',
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='log_in'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='log_out'),
    url(r'^/*$', IndexView.as_view(), name='index'),
    url(r'^sign_in*$', SignInView.as_view(), name='sign_in'),
    url(r'^sign_up*$', SignUpView.as_view(), name='sign_up'),
    url(r'^new_blog*$', NewBlogView.as_view(), name='new_blog'),
)
