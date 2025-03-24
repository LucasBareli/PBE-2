from rest_framework import serializers
from .models import *

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro #referencia o Model de cadastro
        many = True #lida quando queremos fazer vários registros de uma vez
        fields = '__all__' #campos que serão transformados de json para python e vice versa

class DisciplinasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinas
        many = True
        fields = '__all__'

class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        many = True
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        many = True
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        many = True
        fields = '__all__'