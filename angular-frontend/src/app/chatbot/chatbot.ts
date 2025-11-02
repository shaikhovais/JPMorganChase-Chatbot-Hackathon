import { Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatbotApiService } from '../../services/chatbot.service';

interface Message {
	message: string;
	sender: 'user' | 'bot';
	timestamp: Date;
	options?: DefaultOption[];
}

interface DefaultOption {
	title: string;
	question: string;
}

interface Response {
	response: string;
	statusCode: string;
}

@Component({
	selector: 'app-chatbot',
	standalone: true,
	imports: [CommonModule, FormsModule, NgbDropdownModule],
	templateUrl: './chatbot.html',
	styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewInit {
	@ViewChild('messageBox') messageBox!: ElementRef;
	@ViewChild('messageInput') messageInput!: ElementRef;

	posts: any;
	inputMessage: string = '';
	botResponse: Response | undefined;
	messages: Message[] = [];

	sendMsgImgPath: string = 'images/send.png';
	menuImgPath: string = 'images/menu.png';
	saveChatImgPath: string = 'images/save-chat.png';
	savedChatsImgPath: string = 'images/saved-chats.png';
	newChatImgPath: string = 'images/new-chat.png';
	chatbotImgPath: string = 'images/chatbot.png';

	constructor(private chatbotApiService: ChatbotApiService) {
		this.startNewChat();
	}

	ngAfterViewInit() {
		this.messageInput.nativeElement.focus();
	}

	// Send user query and fetch response from backend
	sendMessage() {
		if (!this.inputMessage.trim()) return;

		this.messages.push({
			message: this.inputMessage,
			sender: 'user',
			timestamp: new Date()
		});
		this.fetchResponse();
	}

	async fetchResponse() {
		try {
			this.botResponse = await this.chatbotApiService.fetchResponse(this.inputMessage);
			this.messages.push({
				message: this.botResponse.response,
				sender: "bot",
				timestamp: new Date(),
				options: this.botResponse.statusCode === '404' ? this.fetchDefaultOptions() : [] // if no response found, then show some default options for user to choose
			})
			this.inputMessage = '';
			setTimeout(() => {
				this.scrollToBottom();
			}, 0);
		} catch (error) {
			console.warn('Error fetching response:', error);
		}
	}

	scrollToBottom() {
		this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
	}

    startNewChat() {
        this.messages = [];
        this.inputMessage = '';
        this.messages.push({
			message: 'Hi there! I am a chatbot and I am here to help you. I can answer questions about JPMorgan Chase and Nutmeg. I can also answer fun questions and solve basic arithmetics.',
			sender: 'bot',
			timestamp: new Date(),
			options: this.fetchDefaultOptions()
		});
    }

	// Save chat in local storage
    saveChat() {
		if(this.messages.length <= 1) {
			alert('No messages to save');
			return;
		}
        const chatData = {
            messages: this.messages,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('savedChat', JSON.stringify(chatData));
        alert('Chat saved successfully!');
    }

	defaultOptionSelection(option: DefaultOption) {
		this.inputMessage = option.question;
		this.sendMessage();
	}

	// Fetch last saved chat from local storage
	fetchSavedChats() {
		const savedChat = localStorage.getItem('savedChat');
		if (savedChat) {
			const chatData = JSON.parse(savedChat);
			this.messages = chatData.messages;
		}
	}

	fetchDefaultOptions(): DefaultOption[] {
		const defaultOptions: DefaultOption[] = [
			{ title: 'Asset and wealth management', question: 'Tell me more about asset and wealth management' },
			{ title: 'Commercial and investment banking', question: 'Tell me about commercial and investment banking' },
			{ title: 'Career opportunities in technology', question: 'Do you have any opportunities available in Technology?' },
			{ title: 'Life in JPMorgan', question: "What's it like working at JPMorgan?" },
		];
		return defaultOptions;
	}
}