from django.shortcuts import render
from .models import Cadastro, Disciplinas, Turma, Curso, Ambiente
from .serializer import CadastroSerializer, DisciplinasSerializer, TurmaSerializer, CursoSerializer, AmbienteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
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
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasView(ListCreateAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]

class TurmaView(ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]

class TurmaAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]

class CursoView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

class CursoAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

class AmbienteView(ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

class AmbienteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]