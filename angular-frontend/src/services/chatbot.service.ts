import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { lastValueFrom } from 'rxjs';

interface Response {
    response: string;
    statusCode: string;
}

@Injectable({
    providedIn: 'root',
})
export class ChatbotApiService {
    private apiUrl = 'http://localhost:5001/query';

    constructor(private http: HttpClient) {}

    async fetchResponse(inputMessage: string): Promise<Response> {
        try {
        const result$ = this.http.post<{ response: string }>(this.apiUrl, { query: inputMessage }).pipe(
            catchError(error => {
                console.error('Error fetching response:', error);
                return of({
                    response: 'Error fetching response',
                    statusCode: '404'
                });
            })
        );

        const result = await lastValueFrom(result$);
        return {
            response: result.response,
            statusCode: result.response.includes('I am sorry') ? "404" : "200"
        };
        } catch (error) {
            console.error('Error in fetchResponse:', error);
            return {
                response: 'Error fetching response',
                statusCode: '404'
            };
        }
    }
}
