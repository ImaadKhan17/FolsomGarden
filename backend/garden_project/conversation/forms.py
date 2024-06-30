from django import forms

from .models import ConversationMessage

class ConversationForm(forms.ModelForm):
    class Meta:
        model = ConversationMessage
        fields = ('content',)
        widgets={
            'contents' : forms.TextInput(attrs={
                'class': 'w-full py-4 px-6 rounded-xl border bg-red-500',
                })
        }