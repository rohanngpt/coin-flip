#include <stdio.h>
#include <stdlib.h>
#include <time.h>


int main() {
    srand(time(NULL));

    int user1_choice, user2_choice;
    int flips[10];
    int score1 = 0, score2 = 0;

    // --- Take input from player 1 only ---
    printf("Enter Player 1 choice (1 for Heads, 2 for Tails): ");
    scanf("%d", &user1_choice);

    // automatically assign opposite choice to player 2
    if (user1_choice == 1) {
        user2_choice = 2;
    } else {
        user2_choice = 1;
    }

    printf("\nPlayer 2 automatically gets %s.\n",
           (user2_choice == 1) ? "Heads" : "Tails");

    printf("\nFlipping the coin 10 times...\n\n");

    for (int i = 0; i < 10; i++) {
        flips[i] = 1 + rand() % 2;
        printf("Flip %d: %s\n", i + 1, (flips[i] == 1) ? "Heads" : "Tails");

        if (flips[i] == user1_choice)
            score1++;
        if (flips[i] == user2_choice)
            score2++;
        
    }

    printf("\n----------------------------\n");
    printf("Player 1 correct guesses: %d\n", score1);
    printf("Player 2 correct guesses: %d\n", score2);
    printf("----------------------------\n");

    if (score1 > score2) {
        printf("🏆 Player 1 wins!\n");
    } else if (score2 > score1) {
        printf("🏆 Player 2 wins!\n");
    } else {
        printf("🤝 It's a draw!\n");
    }

    return 0;
}

