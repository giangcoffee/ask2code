from django.views.generic.base import TemplateView
from django.shortcuts import render


class IndexView(TemplateView):
    template_name = 'index.html'

    def get(self, request):
        return render(request, self.template_name)

class SignInView(TemplateView):
    template_name = 'signin.html'

    def get(self, request):
        return render(request, self.template_name)

class SignUpView(TemplateView):
    template_name = 'register.html'

    def get(self, request):
        return render(request, self.template_name)

class NewBlogView(TemplateView):
    template_name = 'create_blog.html'

    def get(self, request):
        return render(request, self.template_name)

