import logging

from django.core.mail import send_mass_mail
from django.template.loader import render_to_string
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from agotboardgame.settings import DEFAULT_FROM_MAIL
from agotboardgame_main.models import User, Game
from api.serializers import UserSerializer, GameSerializer, RoomSerializer
from chat.models import Room

LOGGER = logging.getLogger(__name__)


class UserViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GameViewSet(RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class RoomViewSet(CreateModelMixin, GenericViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


@api_view(['POST'])
@csrf_exempt
def notify(request, game_id):
    user_ids = request.data['users']
    game = Game.objects.get(id=game_id)
    users = [User.objects.get(id=user_id) for user_id in user_ids]

    # Filter users who turned off email
    users = [user for user in users if user.email_notification_active]

    mails = [
        (
            f'{game.name} -  It\'s your turn!',
            render_to_string(
                'agotboardgame_main/mail_notification.html',
                {'game': game, 'user': user, 'game_url': request.build_absolute_uri(reverse('play', args=[game.id]))}
            ),
            DEFAULT_FROM_MAIL, [user.email]
        )
        for user in users
    ]

    send_mass_mail(mails)

    return Response({'status': 'ok'})
