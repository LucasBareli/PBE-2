from django.shortcuts import render
from .models import Cadastro
from .serializer import CadastroSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView
from rest_framework import status

@api_view(['GET', 'POST'])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Cadastro.objects.all()
        serializer = CadastroSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfessoresView(ListCreateAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer