using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RemoveApplicantUsernameFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_Users_Username",
                table: "Applicants");
            
            migrationBuilder.DropIndex(
                name: "IX_Applicants_Username",
                table: "Applicants");
            
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Applicants");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table:"Applicants",
                type: "nvarchar(450)");
            
            migrationBuilder.CreateIndex(
                name: "IX_Applicants_Username",
                table: "Applicants",
                column: "Username");
            
            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_Users_Username",
                table: "Applicants",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
