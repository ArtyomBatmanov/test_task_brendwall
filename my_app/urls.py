from django.shortcuts import render
from django.urls import path
from .views import ProductListCreateView, ProductDetailView


def index(request):
    return render(request, 'my_app/index.html')



urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),  
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('', index, name='index'),
]
