using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class upadateclassnull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Classe_ClasseId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "ClasseId",
                table: "User",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Classe_ClasseId",
                table: "User",
                column: "ClasseId",
                principalTable: "Classe",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Classe_ClasseId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "ClasseId",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Classe_ClasseId",
                table: "User",
                column: "ClasseId",
                principalTable: "Classe",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
